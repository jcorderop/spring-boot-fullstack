package com.cordero.fullstack.user;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@EqualsAndHashCode @ToString
@Getter @Setter
@NoArgsConstructor @RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_seq",
            sequenceName = "user_seq",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            generator = "user_seq",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @NonNull
    @Column(nullable = false)
    @NotBlank(message = "Invalid name...")
    private String name;

    @NonNull
    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email...")
    private String email;

    @NonNull
    @Column(name = "user_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;
}
