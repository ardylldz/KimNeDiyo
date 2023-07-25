package tv.codelong.thenewboston.dto

import org.springframework.web.multipart.MultipartFile

/**
 * This file contains all incoming DTOs.
 * Here, [LoginDto] is a data class containing immutable class members
 */
data class LoginDto(
    val name: String,
    val password: String,
)

data class RegisterDto(
    val name: String,
    val password: String,
)

data class CreateItemDto(
    val name: String,
    val count: Int,
    val note: String?,
)

data class UpdateItemDto(
    val id: Long,
    val name: String,
    val count: Int,
    val note: String?,
)

data class CreateNewsDto(
    val header: String,
    val content: String?,
    val img: MultipartFile?
)
