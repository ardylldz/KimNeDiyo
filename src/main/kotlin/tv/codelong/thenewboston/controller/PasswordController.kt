package tv.codelong.thenewboston.controller

import org.springframework.web.bind.annotation.*
import tv.codelong.thenewboston.dto.ApiException
import tv.codelong.thenewboston.dto.PasswordChangeDto
import tv.codelong.thenewboston.service.UserService

class PasswordController {
    @RestController
    @RequestMapping("/api")
    class UserController(private val userService: UserService) {
        @PostMapping("/password-change")
        fun changePassword(@RequestBody payload: PasswordChangeDto): PasswordChangeDto {
            val user = userService.findByName(payload.username) ?: throw ApiException(400, "User not found")

            val currentPassword = payload.currentPassword
            val newPassword = payload.newPassword

            userService.updatePassword(payload.username, newPassword)
            return PasswordChangeDto(username = payload.username, currentPassword = currentPassword, newPassword = newPassword)
        }
    }
}
