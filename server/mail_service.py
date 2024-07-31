from flask_mail import Mail, Message

mail = Mail()

def init_mail(app):
    mail.init_app(app)

def send_email(recipient, message_body):
    try:
        msg = Message('Response to your query', recipients=[recipient])
        msg.body = message_body
        mail.send(msg)
        return {"status": "success", "message": "Email sent successfully!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
