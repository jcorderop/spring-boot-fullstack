package com.cordero.fullstack.user.response;

import com.cordero.fullstack.api.ApiResponse;
import com.cordero.fullstack.user.User;

import java.util.List;

public record UsersResponse(List<User> users) implements ApiResponse {

}
