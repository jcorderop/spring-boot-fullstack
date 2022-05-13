package com.cordero.fullstack.user;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;
    private UserService service;

    @BeforeEach
    void setUp() {
        service = new UserService(repository);
    }

    @AfterEach
    void tearDown() throws Exception {
    }

    @Test
    @DirtiesContext
    void getUsersByTypePrivate() {
        //given

        //when
        service.getUsersByType(UserType.PRIVATE);

        //then
        verify(repository).getUserByUserType(UserType.PRIVATE);
    }

    @Test
    @DirtiesContext
    void getUsersByTypeCorporate() {
        //given

        //when
        service.getUsersByType(UserType.CORPORATE);

        //then
        verify(repository).getUserByUserType(UserType.CORPORATE);
    }

    @Test
    @DirtiesContext
    void canCreateAUser() {
        //given
        User user = new User("Jorge Cordero", "jc@gmail.com", UserType.PRIVATE);

        //when
        service.createUser(user);

        //then

        //will be used to capture the saved used
        ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
        //check that save was invoked
        verify(repository).save(userArgumentCaptor.capture());
        //used the user saved/capture and value returns the user
        User captureUser = userArgumentCaptor.getValue();
        assertThat(captureUser).isEqualTo(user);
    }

    @Test
    @DirtiesContext
    void canNotCreateAUser_emailTaken() {
        //given
        User user = new User("Jose", "jc@gmail.com", UserType.PRIVATE);
        given(repository.findUserByEmail(user.getEmail())).willReturn(Optional.ofNullable(user));

        //when

        //then
        assertThatThrownBy(() -> service.createUser(user))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("already exist");

        verify(repository, never()).save(any());
    }

    @Test
    @DirtiesContext
    void canDeleteUser() {
        //given
        Long userId = 1L;
        given(repository.existsById(userId))
                .willReturn(true);

        //when
        service.deleteUser(userId);

        //then
        verify(repository).deleteById(userId);
    }

    @Test
    @DirtiesContext
    void canNotDeleteUser_doesNotExist() {
        //given
        Long userId = 1L;
        given(repository.existsById(userId))
                .willReturn(false);

        //when

        //then
        assertThatThrownBy(() -> service.deleteUser(userId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("not found");

        verify(repository, never()).deleteById(userId);
    }
}