from django.core.mail import EmailMultiAlternatives, send_mail
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
   
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)
    }    

    subject = 'RECUPERAR CONTRASEÑA - UCSS'
    from_email = '<felipebarraza@smarthydro.cl>'
    content = render_to_string(
        'email/user_reset_password.html',
        {
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'reset_password_url': "http://localhost:3000/reset_password/{}/{}".format(
                reset_password_token.key,
                reset_password_token.user.email
                )
        }
    )
    msg = EmailMultiAlternatives(subject, content, from_email, [reset_password_token.user.email])
    msg.attach_alternative(content, "text/html")
    msg.send()
