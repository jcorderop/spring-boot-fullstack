package com.cordero.fullstack.user;

import lombok.*;

@EqualsAndHashCode @ToString
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class User {

    private Long id;
    private String name;
    private String email;
    private UserType userType;

}
