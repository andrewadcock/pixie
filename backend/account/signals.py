from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.utils.html import strip_tags


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):

    email_plaintext_message = "<h2>Looks like you forgot your password</h2> Don't worry,\
        we forget things sometimes too. localhost:3000/account/forgot-password \
        &page=confirm&token={}&email={}".format(
        reset_password_token.key, reset_password_token.user.email)

#     html_message = render_to_string('mail_template.html', {'context': 'values'})
    plain_message = strip_tags(email_plaintext_message)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="No, you pick - password reset"),
        # message:
        # email_plaintext_message,
        plain_message,
        # from:
        "Pixie - No Reply <andrew@andrewadcock.com>",
        # to:
        [reset_password_token.user.email]
    )
