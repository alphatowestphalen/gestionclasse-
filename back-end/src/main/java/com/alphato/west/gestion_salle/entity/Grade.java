package com.alphato.west.gestion_salle.entity;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "grade")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class Grade  {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long codeGrade;

    @NotNull
    private String designation;

    @CreationTimestamp
    @Column(name = "created_at",nullable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
