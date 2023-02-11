def check(email): 
    """
    It checks if the email is a gmail email or not.
    
    :param email: The email address to be checked
    :return: True
    """
    splittedEmail = email.split('@')[1]
    if splittedEmail != 'gmail.com':
        return True
    return 'Invalid email'

print(check('iyayiemmanuel1@gmail.com'))