package tv.codelong.thenewboston.controller


import org.springframework.web.bind.annotation.*
import tv.codelong.thenewboston.dto.ApiException
import tv.codelong.thenewboston.dto.LoginDto
import tv.codelong.thenewboston.dto.LoginResponseDto
import tv.codelong.thenewboston.dto.RegisterDto
import tv.codelong.thenewboston.model.User
import tv.codelong.thenewboston.service.HashService
import tv.codelong.thenewboston.service.TokenService
import tv.codelong.thenewboston.service.UserService

/**
 * This controller handles login and register requests.
 * Both routes are public as specified in SecurityConfig.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:3000"])
class AuthController(
        private val hashService: HashService,
        private val tokenService: TokenService,
        private val userService: UserService,
) {
    @PostMapping("/login")
    fun login(@RequestBody payload: LoginDto): LoginResponseDto {
        val user = userService.findByName(payload.name) ?: throw ApiException(400, "Login failed")

        if (!hashService.checkBcrypt(payload.password, user.password)) {
            throw ApiException(400, "Login failed")
        }

        return LoginResponseDto(
                token = tokenService.createToken(user),
        )
    }

    //make user controller dto and get the user from there
    @PostMapping("/register")
    fun register(@RequestBody payload: RegisterDto): LoginResponseDto {
        if (userService.existsByName(payload.name)) {
            throw ApiException(400, "Name already exists")
        }

        val user = User(
                name = payload.name,
                password = hashService.hashBcrypt(payload.password),
        )

        val savedUser = userService.save(user)

        return LoginResponseDto(
                token = tokenService.createToken(savedUser),
        )
    }
}
