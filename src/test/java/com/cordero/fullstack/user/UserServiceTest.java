package com.cordero.fullstack.user;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
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
    void getUsersByTypePrivate() {
        //given

        //when
        service.getUsersByType(UserType.PRIVATE);

        //then
        verify(repository).getUserByUserType(UserType.PRIVATE);
    }

    @Test
    void getUsersByTypeCorporate() {
        //given

        //when
        service.getUsersByType(UserType.CORPORATE);

        //then
        verify(repository).getUserByUserType(UserType.CORPORATE);
    }

    @Test
    @Disabled
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
    @Disabled
    void deleteUser() {
    }
}