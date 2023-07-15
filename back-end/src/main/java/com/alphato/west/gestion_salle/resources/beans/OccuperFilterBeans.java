package com.alphato.west.gestion_salle.resources.beans;

import jakarta.ws.rs.QueryParam;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OccuperFilterBeans {
    @QueryParam("start")
    String start;

    @QueryParam("end")
    String end;

    @QueryParam("date")
    String date;

    public LocalDate getDate(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(this.date,formatter);
    }
    public LocalTime getStart(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return LocalTime.parse(this.start,formatter);
    }
    public LocalTime getEnd(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        return LocalTime.parse(this.end,formatter);
    }

    public boolean isNoFilters(){
        return date == null && start == null && end == null;
    }

    public boolean isDate(){
        return date != null && start == null && end == null;
    }
    public boolean isHasFilter(){
        return date != null && start != null && end != null;
    }

}
