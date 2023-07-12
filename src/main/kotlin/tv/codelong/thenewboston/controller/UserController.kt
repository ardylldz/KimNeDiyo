package tv.codelong.thenewboston.controller

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import tv.codelong.thenewboston.dto.*
import tv.codelong.thenewboston.model.User
import tv.codelong.thenewboston.service.UserService

@RestController
@RequestMapping("/api")
class UserController(
        private val userService: UserService,
) {
    @GetMapping("/user/{id}")
    fun user(@PathVariable id: Long): UserDto {
        val user = userService.findById(id) ?: throw ApiException(400, "User not found")
        return UserDto(
                id = user.id,
                name = user.name,
                password = user.password
        )
    }

    @GetMapping("/username")
    fun user(): String {
        val loggedInUsername = getLoggedInUsername()
        if (loggedInUsername != null) {
            val user = userService.findByName(loggedInUsername) ?: throw ApiException(400, "User not found")
            return user.name
        }
        throw ApiException(401, "User not authenticated")
    }

    private fun getLoggedInUsername(): String? {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication != null && authentication.isAuthenticated) {
            return (authentication.principal as? User)?.name
        }
        return null
    }
}
