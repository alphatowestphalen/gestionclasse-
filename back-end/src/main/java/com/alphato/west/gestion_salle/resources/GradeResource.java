package com.alphato.west.gestion_salle.resources;

import com.alphato.west.gestion_salle.entity.Grade;
import com.alphato.west.gestion_salle.service.GradeService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("grades")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GradeResource {
    @GET
    @Path("/{id}")
    public Response  getGrade(@PathParam("id") Long id) {
        try {
            GradeService service = new GradeService();
            Grade grade =  service.find(id);
            return Response.ok(grade).build();
        }catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateGrade(@PathParam("id") Long id, Grade grade) {
        try {
            grade.setCodeGrade(id);
            GradeService service = new GradeService();
            grade =  service.update(grade);
            return Response.status(Response.Status.OK).entity(grade).build();

        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    public List<Grade> getGradeList(){
        GradeService service = new GradeService();
        return service.findAll();
    }

    @POST
    public Grade createGrade(Grade grade){
        GradeService service = new GradeService();
        return service.save(grade);
    }

    @GET
    @Path("/search/{patern}")
    public List<Grade> searchGrad(@PathParam("patern") String patern){
        GradeService service = new GradeService();
        return service.getGradeLikeDesignation(patern).stream().toList();
    }


    @DELETE
    @Path("/{id}")
    public Response deleteGrade(@PathParam("id") Long id) {
        try {
            GradeService service = new GradeService();
            boolean resp =  service.remove(id);
            return Response.ok(resp).build();
        }catch (Exception e) {
            return Response.status(500).build();
        }

    }
}
