from flask import Flask, render_template, request
import qrcode
import uuid
import os
from PIL import Image
import time
app = Flask(__name__)

UPLOAD_FOLDER = "static/qr_codes"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":

        # Always define variables FIRST
        qr_type = request.form.get("qr_type", "text")
        data = None
        
    # ---------- Smart QR Data Builder ----------
        if qr_type == "wifi":
            ssid = request.form.get("ssid")
            password = request.form.get("password")

            if ssid and password:
                data = f"WIFI:T:WPA;S:{ssid};P:{password};;"
            else:
                data = None

        elif qr_type == "contact":
            name = request.form.get("name")
            phone = request.form.get("phone")
            email = request.form.get("email")

            if name or phone or email:
                data = f"""BEGIN:VCARD
        VERSION:3.0
        N:{name}
        TEL:{phone}
        EMAIL:{email}
        END:VCARD"""
            else:
                data = None

        else:  # text type
            text_data = request.form.get("data", "")
            if text_data and text_data.strip():
                data = text_data.strip()
            else:
                data = None

        color = request.form.get("color", "black")
        logo_file = request.files.get("logo")

        if data is not None:
            bgcolor = request.form.get("bgcolor", "white")
            size = int(request.form.get("size", 10))
            qr = qrcode.QRCode(
                version=None,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=size,
                border=4,
            )
            qr.add_data(data)
            qr.make(fit=True)

            img = qr.make_image(fill_color=color, back_color=bgcolor).convert("RGB")

            # ---------- Add Logo if Uploaded ----------
            if logo_file and logo_file.filename != "":
                logo_path = os.path.join(UPLOAD_FOLDER, f"logo_{uuid.uuid4().hex}.png")
                logo_file.save(logo_path)

                logo = Image.open(logo_path)

                qr_w, qr_h = img.size
                logo_size = int(qr_w * 0.2)
                logo = logo.resize((logo_size, logo_size))

                pos = ((qr_w - logo_size) // 2, (qr_h - logo_size) // 2)
                img.paste(logo, pos, mask=logo if logo.mode == "RGBA" else None)
            # ---------- Cleanup old files ----------
            for file in os.listdir(UPLOAD_FOLDER):
                path = os.path.join(UPLOAD_FOLDER, file)
                if os.path.isfile(path) and time.time() - os.path.getmtime(path) > 600:
                    os.remove(path)
            
            # ---------- Save QR ----------
            filename = f"{uuid.uuid4().hex}.png"
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            img.save(file_path)

            return render_template("index.html", qr_code=file_path)
        else:
            return render_template("index.html", qr_code=None, error="Please fill required fields")


    return render_template("index.html", qr_code=None)

if __name__ == "__main__":
    app.run(debug=True)