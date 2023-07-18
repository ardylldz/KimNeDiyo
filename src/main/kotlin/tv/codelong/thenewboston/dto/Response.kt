package tv.codelong.thenewboston.dto

import org.springframework.web.server.ResponseStatusException

/**
 * This file contains all outgoing DTOs.
 * [ApiException] is used to easily throw exceptions.
 */
class ApiException(code: Int, message: String) : ResponseStatusException(code, message, null)

data class LoginResponseDto(
        val token: String,
)

data class ItemDto(
        val id: Long,
        val name: String,
        val count: Int,
        val note: String?,
)

data class UserDto(
        val id: Long,
        val name: String,
        val password: String,
)

data class NewsDto(
        val id: Long,
        val header: String,
        val content: String?,
)

data class NameDto(
        val name: String,
)

data class PasswordChangeDto(
        val username: String,
        val currentPassword: String,
        val newPassword: String
)
