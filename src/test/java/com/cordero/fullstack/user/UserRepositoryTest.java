package com.cordero.fullstack.user;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ActiveProfiles("test")
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @DirtiesContext
    @Test
    void itShouldSelectAUserByEmail_ThatExist() {
        //given
        User user = new User("Jorge Cordero", "jc@gmail.com", UserType.PRIVATE);
        repository.save(user);

        //when
        boolean exist = repository.findUserByEmail(user.getEmail()).isPresent();

        //then
        assertThat(exist).isTrue();
    }

    @DirtiesContext
    @Test
    void itShouldNotSelectAUserByEmail_DoesNotExist() {
        //given
        User user = new User("Jorge Cordero", "jc@gmail.com", UserType.PRIVATE);

        //when
        boolean exist = repository.findUserByEmail(user.getEmail()).isPresent();

        //then
        assertThat(exist).isFalse();
    }

}