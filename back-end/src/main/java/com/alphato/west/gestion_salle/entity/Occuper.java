package com.alphato.west.gestion_salle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "occuper")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Occuper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeOcc;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "professeur_code",
            foreignKey = @ForeignKey(name = "O_PROFESSEUR_CODE")
    )
    private Professeur professeur;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "salle_code",
            foreignKey = @ForeignKey(name = "0_SALLE_CODE")
    )
    private Salle salle;

    @NotNull
    @Temporal(TemporalType.DATE)
    private LocalDate dateOccupe;
    @NotNull
    @Temporal(TemporalType.TIME)
    private LocalTime startTime;
    @NotNull
    @Temporal(TemporalType.TIME)
    private LocalTime endTime;
    @CreationTimestamp
    @Column(name = "created_at",nullable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public void update(Occuper occuper){
        setProfesseur(occuper.getProfesseur());
        setSalle(occuper.getSalle());
        setEndTime(occuper.getEndTime());
        setStartTime(occuper.getStartTime());
        setDateOccupe(occuper.getDateOccupe());
    }

    public void setDateOccupe(){

    }
}
