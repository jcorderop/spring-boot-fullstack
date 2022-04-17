package com.cordero.fullstack.user.response;

import com.cordero.fullstack.api.ApiResponse;
import com.cordero.fullstack.user.User;

public record UserResponse(User user) implements ApiResponse {

}
