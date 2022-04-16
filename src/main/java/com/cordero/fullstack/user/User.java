package com.cordero.fullstack.user;

import lombok.*;

import javax.persistence.*;

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
    private String name;
    @NonNull
    private String email;
    @NonNull
    @Column(name = "user_type")
    @Enumerated(EnumType.STRING)
    private UserType userType;
}
