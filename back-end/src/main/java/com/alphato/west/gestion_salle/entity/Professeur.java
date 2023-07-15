package com.alphato.west.gestion_salle.entity;

import com.alphato.west.gestion_salle.util.GenreConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "professeur")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Professeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeProf;

    @NotNull
    private String name;

    @Convert(converter = GenreConverter.class)
    @Column
    @NotNull
    private Genre genre;

    @ManyToOne
    @NotNull
    @JoinColumn(
            name = "grade_code",
            foreignKey = @ForeignKey(name = "GRADE_CODE")
    )
    private Grade grade;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    public void update(Professeur professeur){
       setName(professeur.getName());
        setGenre(professeur.getGenre());
        System.out.println("genre"+ professeur.genre.name());
        setGrade(professeur.getGrade());
    }
}
