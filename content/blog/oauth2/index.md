---
title: OAuth 2.0 w prosty sposób
date: "2020-06-28T02:12:03.284Z"
description: "Próba przedstawienia podstaw OAuth 2.0 w praktyce"
---

### Definicja

OAuth 2.0 - na wikipedii możemy znaleźć definicję zaczynającą się od "standardowy protokół autoryzacji dostępu", który jednak w sobie ma już pewną nieścisłość. Dokument [RFC 6749](https://tools.ietf.org/html/rfc6749) zawierający specyfikację mówi tu o frameworku autoryzacyjnym, czyli rozwiązaniu bardziej "swobodnym i luźnym", które pozwala na różne implementacje - w przeciwieństwie do protokołu. Ale zostawmy zabawę słowną i przejdźmy do wytłumaczenia działania.

OAuth 2.0 określa w jaki sposób właściciel zasobu może dać innemu podmiotowi pewien zakres dostępu do zasobu. W praktyce wygląda to tak, że użytkownik podczas logowania do dowolnej aplikacji internetowej, nie chcąc tworzyć kolejnego loginu i hasła, używa swojego profilu Google lub Facebook - czyli daje aplikacji dostęp do zasobu profilu. Oczywiście dostęp jest na określony czas i zakres (najczęściej to odczyt e-maila i podstawowych danych profilowych, np. imienia). Warto tu nadmienić, że OAuth 2.0 jest w takim przypadku wykorzystywany do uwierzytelnienia, co jest nadinterpretacją celu jakiemu wg specyfikacji służy - autoryzacji.

### Praktyka od strony użytkownika

Aby pokazać to od strony użytkownika posłużę się moją (jeszcze nie wydaną) aplikacją "zbieram" na której można zalogować się przez GitHuba.

Jesteśmy użytkownikiem (czyli właścicielem zasobu) i chcemy udostępnić aplikacji "zbieram" (to jest Klient) pewien zakres danych (zasobów) z GitHuba (serwer zasobu i serwer autoryzacyjny).

![Wybieramy logowanie](./1_start.jpg)

Wybierając logowanie za pomocą GitHuba zostajemy przekierowani na stronę github.com

![Logujemy się](./2_login.jpg)

Po prawidłowym uwierzytelnieniu (potwierdzeniu tożsamości za pomocą loginu i hasła) pojawia się informacja o aplikacji ("zbieram"), która chce otrzymać dostęp do e-maila i danych profilowych.

![Autoryzacja](./3_auth.jpg)

Po udzieleniu zgody powracamy do aplikacji "zbieram", gdzie jesteśmy już zalogowani.

### Praktyka od strony aplikacji

Spójrzmy teraz na infografikę pokazującą co w rzeczywistości zostało przesyłane.

![Diagram](./4_ulm.jpg)
