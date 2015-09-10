## java中使用货币 Currency
```java
//http://www.joda.org/joda-money/
//http://www.currency-iso.org/dam/downloads/table_a1.xml

package currency;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;
import java.util.Set;

import org.joda.money.CurrencyUnit;
import org.joda.money.Money;
public class Main {

    public static void main(String args[]) {
        System.out.println("heloo world");
       
        // http://docs.oracle.com/javase/7/docs/api/java/util/Currency.html
        // ISO 4217
        // http://www.currency-iso.org/dam/downloads/table_a1.xml
        //testCurrency();
       
        //allCurrency();
       
        currentOutput();
       
        jodaMoney();
       
    }
   
    public static void testCurrency(){
       
        String[] names = {"CNY" , "USD" , "EUR"};
        for(String code : names){
            java.util.Currency c = java.util.Currency.getInstance(code);
            System.out.println(c.getDisplayName());
            System.out.println(c.getNumericCode());
            System.out.println(c.getSymbol(Locale.US));
            System.out.println(c.toString());
            System.out.println(c.getDefaultFractionDigits());
            System.out.println("===========");
        }
       
        //System.out.println(c.getDisplayName());
        //System.out.println(c.getDisplayName());
       
    }
   
    public static void allCurrency(){
        Set<Currency> set = java.util.Currency.getAvailableCurrencies();
        System.out.println(" the size is " + set.size());
        for(Currency cur: set) {
            System.out.println(cur.getDisplayName());
            System.out.println(cur.getSymbol(Locale.FRANCE));
        }
    }
   
    public static void currentOutput(){
        NumberFormat f = NumberFormat.getCurrencyInstance();
        System.out.println(f.format(51235.1264));
       
        f = NumberFormat.getCurrencyInstance(Locale.JAPAN);
        System.out.println(f.format(51235.1264));
       
       
//http://download.oracle.com/technetwork/java/javase/6/docs/zh/api/java/text/DecimalFormat.html
        DecimalFormat df = new DecimalFormat("#,0000.00 EUR");
        System.out.println(df.format(412314512.8163));
    }
   
    //http://www.joda.org/joda-money/
    // http://search.maven.org/#search|ga|1|a%3A%22joda-money%22
    public static void jodaMoney(){
        // create a monetary value
          Money money = Money.parse("USD 23.87");
          System.out.println(money.toString());
          // add another amount with safe double conversion
          CurrencyUnit usd = CurrencyUnit.of("USD");
          //usd.get
          money = money.plus(Money.of(usd, 12.43d));
          System.out.println(money.toString());
          Money m = Money.zero(usd);
         
          // 1, usd + cny
          // 2 cny 12.423232
          // 3 money's coustructor
          // CurrencyUnit encapsulate Currency
    }
}
```
