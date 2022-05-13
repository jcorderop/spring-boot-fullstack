package com.cordero.fullstack.user.it;

import com.cordero.fullstack.user.User;
import com.cordero.fullstack.user.UserType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@ActiveProfiles("it")
@SpringBootTest
public class StudentIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private Faker faker = new Faker();

    @Test
    @DirtiesContext
    void canCreateAUser() throws Exception {
        //given
        String name = faker.funnyName().name();
        User user = new User(name,
                String.format("%s@crypto.com",name.replace(" ", "").toLowerCase()),
                UserType.PRIVATE);
        MockHttpServletRequestBuilder content = MockMvcRequestBuilders.post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user));

        //when
        ResultActions resultAction = mockMvc.perform(content);

        //then
        resultAction
                .andExpect(status().isCreated())
                .andExpect(result -> {
                    System.out.println(result.getResponse().getContentAsString());
                    jsonPath("$.user.id", result.getResponse().getContentAsString()).exists();
                    jsonPath("$.user.name", result.getResponse().getContentAsString()).value(user.getName());
                    jsonPath("$.user.email", result.getResponse().getContentAsString()).value(user.getEmail());
                    jsonPath("$.user.userType", result.getResponse().getContentAsString()).value(user.getUserType());
                });
    }
}
