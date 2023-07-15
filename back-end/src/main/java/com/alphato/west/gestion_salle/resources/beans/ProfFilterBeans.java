package com.alphato.west.gestion_salle.resources.beans;

import com.alphato.west.gestion_salle.entity.Grade;
import jakarta.ws.rs.QueryParam;



public class ProfFilterBeans {
    @QueryParam("name") String name;
    @QueryParam("Genre") Character genre;
    @QueryParam("grade")
    Grade grade;
}
