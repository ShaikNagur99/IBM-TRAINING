import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class DateTimeAPI {
    public static void main(String[] args) {

        // LocalDate
        LocalDate date = LocalDate.now();
        System.out.println("Current Date : " + date);

        // LocalTime
        LocalTime time = LocalTime.now();
        System.out.println("Current Time : " + time);

        // LocalDateTime
        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println("Current Date and Time : " + dateTime);

        // ZonedDateTime
        ZonedDateTime zoneDateTime = ZonedDateTime.now();
        System.out.println("Current Date, Time and Time Zone : " + zoneDateTime);
    }
}