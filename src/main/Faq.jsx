import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function Faq() {
  const faqTextPl = `FAQ - Najczęściej zadawane pytania

  - Jak przeglądać i wyszukiwać produkty w sklepie?
  Możesz przeglądać produkty w sklepie według kategorii, producentów lub nowości. Możesz także użyć wyszukiwarki, która znajduje się w górnym strony. Wystarczy wpisać nazwę produktu lub słowo kluczowe i nacisnąć enter. Otrzymasz listę produktów pasujących do Twojego zapytania. Możesz także sortować i filtrować wyniki wyszukiwania według różnych kryteriów, takich jak cena, ocena, dostępność czy popularność.
  
  - Jak dodać produkt do koszyka?
  Aby dodać produkt do koszyka, kliknij na przycisk “Dodaj do koszyka” znajdujący się pod zdjęciem produktu lub na stronie szczegółowej produktu. Produkt zostanie automatycznie dodany do Twojego koszyka, który możesz zobaczyć w prawym górnym rogu strony. Możesz także zmienić ilość produktów w koszyku lub usunąć je z koszyka, klikając na ikonę koszyka i wybierając odpowiednią opcję.
  
  - Jak zarejestrować nowe konto na stronie?
  Aby zarejestrować nowe konto na stronie, kliknij na przycisk “Zarejestruj się” znajdujący się w prawym górnym rogu strony. Następnie wypełnij formularz rejestracyjny, podając swoje dane osobowe, adres e-mail i hasło. Po stworzeniu konta możesz się zalogować na stronie, korzystając z podanego adresu e-mail i hasła.
  
  - Jak złożyć zamówienie na stronie?
  Aby złożyć zamówienie na stronie, musisz mieć konto na stronie i zalogować się na nie. Następnie przejdź do koszyka, klikając na ikonę koszyka w prawym górnym rogu strony. Sprawdź, czy wszystkie produkty w koszyku są poprawne i kliknij na przycisk “Zamów”. W kolejnym kroku podaj swoje dane do wysyłki i faktury. Postępuj zgodnie z instrukcjami, aby dokończyć proces zamówienia. Po złożeniu zamówienia, możesz go zobaczyć w swoich zamówieniach.
  
  - Jak dodać recenzję produktu na stronie?
  Aby dodać recenzję produktu na stronie, musisz mieć konto na stronie i zalogować się na nie. Następnie znajdź produkt, który chcesz ocenić i kliknij na przycisk doodania recenzji znajdujący się na stronie szczegółowej produktu. Wypełnij formularz recenzji, podając swoją ocenę i treść opinii.
  
  - Jak zadać pytanie o produkt na stronie?
  Aby zadać pytanie o produkt na stronie, musisz mieć konto na stronie i zalogować się na nie. Następnie znajdź produkt, o który chcesz zapytać i kliknij na przycisk zadaj pytanie znajdujący się pod opisem produktu na stronie szczegółowej produktu. Wypełnij formularz pytania treść pytania. Kliknij na przycisk wyślij pytanie i poczekaj na odpowiedź od sprzedawcy lub innych użytkowników. Możesz także przeglądać wcześniej zadane pytania i odpowiedzi na stronie produktu.`;

  const faqTextEn = `FAQ - Frequently Asked Questions
  
- How to browse and search for products in the store?
You can browse products in the store by category, manufacturer or novelty. You can also use the search engine, which is located in the top of the page. Just enter the name of the product or keyword and press enter. You will get a list of products matching your query. You can also sort and filter the search results by various criteria, such as price, rating, availability or popularity.

- How to add a product to the cart?
To add a product to the cart, click on the “Add to cart” button located under the product image or on the product detail page. The product will be automatically added to your cart, which you can see in the upper right corner of the page. You can also change the quantity of products in the cart or remove them from the cart, by clicking on the cart icon and choosing the appropriate option.

- How to register a new account on the site?
To register a new account on the site, click on the “Register” button located in the upper right corner of the page. Then fill out the registration form, providing your personal data, email address and password. After account creation, you can log in to the site, using the provided email address and password.

- How to place an order on the site?
To place an order on the site, you must have an account on the site and log in to it. Then go to the cart, by clicking on the cart icon in the upper right corner of the page. Check if all the products in the cart are correct and click on the “Order” button. In the next step, provide your shipping and billing details. Follow the instructions to complete the order process. After placing the order you can see in your orders.

- How to add a product review on the site?
To add a product review on the site, you must have an account on the site and log in to it. Then find the product you want to rate and click on the add review button located under the product description on the product detail page. Fill out the review form, providing your rating and content of the opinion.

- How to ask a question about a product on the site?
To ask a question about a product on the site, you must have an account on the site and log in to it. Then find the product you want to ask about and click on the ask a question button located under the product description on the product detail page. Fill out the question form, providing content of the question. Click on the submit button and wait for an answer from the seller or other users. You can also browse the previously asked questions and answers on the product page.`;

  return (
    <Stack direction={'row'} sx={{ m: '20px' }}>
      <Typography sx={{ mx: 1 }} style={{ whiteSpace: 'pre-line' }}>
        {faqTextPl}
      </Typography>
      <Typography sx={{ mx: 1 }} style={{ whiteSpace: 'pre-line' }}>
        {faqTextEn}
      </Typography>
    </Stack>
  );
}
