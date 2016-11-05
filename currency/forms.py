from django import forms
from django.core.exceptions import ValidationError
from datetime import datetime


class DateForm(forms.Form):
    user_date = forms.DateField(input_formats=['%Y-%m-%d'], label='Date')

    def clean_user_date(self):
        user_date = self.cleaned_data['user_date']

        if user_date > datetime.now().date():
            raise ValidationError("Date should be less then now.")
        return user_date

    def clean(self):
        print('Cleaning self')
        return self.cleaned_data
