from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import View
from django.contrib import messages

from currency.forms import DateForm
from datetime import datetime


# Create your views here.
class MyView(View):
    def get(self, request):
        form = DateForm()
        today = datetime.now().date()
        val, dates = get_currency(today)
        return render(request, 'currency/index.html',
                      {'form': form,
                       'currency': val,
                       'dates': dates})

    def post(self, request):
        form = DateForm(request.POST)
        if form.is_valid():
            val, dates = get_currency(form.cleaned_data['user_date'])
        else:
            messages.error(request, 'Validation failed')
            val, dates = get_currency(datetime.now().date())
        c = RequestContext(request, {'form': form})
        return render(request, 'currency/index.html',
                      {'form': form,
                       'currency': val,
                       'dates': dates}
                      )


def get_currency(date_start):
    import requests
    import xml.etree.ElementTree as ET
    from datetime import timedelta

    d14 = date_start - timedelta(days=13)
    # R01239 euro
    r = requests.get('http://www.cbr.ru/scripts/XML_dynamic.asp'
                     '?date_req1={0}&date_req2={1}&VAL_NM_RQ=R01235'
                     .format(d14.strftime('%d/%m/%Y'),
                             date_start.strftime('%d/%m/%Y')
                             )
                     )
    tree = ET.fromstring(r.text)
    rates = []
    dates = []
    for val in tree:
        rates.append(float(str(val[1].text).replace(',', '.')))
        dates.append(val.attrib['Date'])
    return rates, dates


if __name__ == "__main__":
    from datetime import datetime
    print(get_currency(datetime.now().date()))
