---
title: Java 14 - Record Class
date: "2020-06-14T01:12:03.284Z"
description: "Java 14 i nowa klasa - Record"
---

17 marca 2020 roku została wydana nowa wersja Javy okraszona numerem 14. Nie jest to wydanie LTS, a więc będzie wspierana tylko do września 2020 roku. Mimo to zawiera aż 16 JEP-ów (JDK Enhancement Proposal), czyli propozycji rozszerzeń do JDK. Jednym z nich jest klasa **Record**.

Należy z góry zaznaczyć, że **Record** jest na razie funkcjonalnością "preview feature". Oznacza to, że może jeszcze ulec zmianie, a przy kompilacji należy uruchomić dodatkową flagę:

```
javac --release 14 --enable-preview <NazwaKlasy>.java
```

### Problem ilości powtarzalnego kodu

Czemu służy klasa **Record**? Aby to pokazać musimy zaprezentować problem i dotychczasowy sposób na jego rozwiązanie. Często w ramach aplikacji tworzone są proste klasy będące nośnikiem informacji. Stosując klasyczne podejście dla przykładowej klasy posiadającej dwie zmienne powinniśmy stworzyć poniższy kod:

```java {numberLines: true}
import java.util.Objects;

public class User {

    private Long id;
    private String name;

    public User(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id) &&
                name.equals(user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```

### Niezbędny Lombok

Najpowszechniejszą droga ucieczki od tak rozwlekłego kodu jest Lombok - biblioteka, która bazując na adnotacjach, tworzy kod za programistę. Oczywiście najpierw musimy ją zainstalować. Poniżej przykład z użyciem Mavena (plik pom).

```xml
<dependencies>
	<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.12</version>
		<scope>provided</scope>
	</dependency>
</dependencies>
```

Następnie stosując adnotacje tworzymy taką samą zawartość (jak powyżej) z mniejszą ilością kodu. Lombok za nas wygeneruje wszystkie metody, które wcześniej musieliśmy pisać:

```java {numberLines: true}
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {

    private Long id;
    private String name;

}
```

### Record Class

I tu pojawia się nowa klasa Javy - **Record**. Chcąc jeszcze bardziej uprościć wszystko co do tej pory stworzyliśmy i użyliśmy, Java proponuje zastosować nowy pomysł z dosłownie jedną linijką kodu, która PRAWIE zastępuje dotychczasowe wypociny.

```java
public record User(Long id, String name) {}
```

No właśnie PRAWIE. Klasa **Record** (przynajmniej w Java 14) na etapie kompilacji zmienia sią na klasę finalną, a więc nie można po niej dziedziczyć. Obiekty utworzone z takiej klasy są niezmienne - raz utworzone już nie podlegają zmianie. Oznacza to, że nie mamy tutaj setterów (metod pozwalających na zmianę stanu), a gettery pozbawione są przedrostka "get". Oczywiście do klasy można dodawać własne konstruktory i metody oraz nadpisywać te generowane automatycznie.

### Podsumowując

Wydawać by się mogło, że klasa **Record** ma za cel zmniejszenie powtarzającego się kodu. Jednak jej "finalne" oblicze oraz przekazane wprost intencje twórców (https://openjdk.java.net/jeps/359) pokazują, że główną motywacją jej stworzenia jest oddzielenie klas niemodyfikowalnych od reszty. Do tworzenia klas modyfikowalnych będących nośnikami informacji pozostaje nam niezbędny Lombok.
