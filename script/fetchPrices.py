# script.py
import requests
from bs4 import BeautifulSoup

def scrape_house_price(finnkode):
    url = f"https://www.finn.no/{finnkode}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    price_div = soup.find('div', attrs={'data-testid': 'pricing-incicative-price'})
    price_spans = price_div.find_all('span')
    if len(price_spans) >= 2:
        price = price_spans[1].text
    else:
        price = "Price not found"
    return int(price.replace(' ', '').replace('\xa0', '').replace('kr', ''))

if __name__ == '__main__':
    price = scrape_house_price('369477606');
    print('price: ', price)