package com.alphato.west.gestion_salle.resources;

import com.alphato.west.gestion_salle.entity.Salle;
import com.alphato.west.gestion_salle.service.SalleService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("salles")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SalleRessource {
    @GET
    public List<Salle> getSalles(){
        SalleService service = new SalleService();
        return service.getAllSalle();
    }
    @GET
    @Path("/search/{patern}")
    public List<Salle> searchGrad(@PathParam("patern") String patern){
        SalleService service = new SalleService();
        return service.getSalleLike(patern);
    }

    @GET
    @Path("/{idProf}")
    public Salle getSalle(@PathParam("idProf") Long codeSalle){
        SalleService service = new SalleService();
        return service.find(codeSalle);
    }


    @POST
    public Salle createProfesseur(Salle salle){
        SalleService service = new SalleService();
        return service.save(salle);
    }
    @PUT
    @Path("/{codeSalle}")
    public Salle createProfesseur(@PathParam("codeSalle") Long codeSalle, Salle salle){
        SalleService service = new SalleService();
        salle.setCodeSal(codeSalle);
        return service.update(salle);
    }
    @DELETE
    @Path("/{codeSalle}")
    public  boolean deleteProfesseur(@PathParam("codeSalle") Long codeSalle){
        SalleService service = new SalleService();
        return service.delete(codeSalle);
    }
}
