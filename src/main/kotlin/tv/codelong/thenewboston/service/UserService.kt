package tv.codelong.thenewboston.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import tv.codelong.thenewboston.dto.ApiException
import tv.codelong.thenewboston.model.User
import tv.codelong.thenewboston.repository.UserRepo

@Service
class UserService(
        private val userRepo: UserRepo,
        private val hashService: HashService) {
    fun findById(id: Long): User? {
        return userRepo.findByIdOrNull(id)
    }

    fun findByName(name: String): User? {
        return userRepo.findByName(name)
    }

    fun existsByName(name: String): Boolean {
        return userRepo.existsByName(name)
    }

    fun save(user: User): User {
        return userRepo.save(user)
    }

    fun updatePassword(username: String, newPassword: String) {
        val user = userRepo.findByName(username) ?: throw ApiException(400, "User not found")
        user.password = hashService.hashBcrypt(newPassword)
        userRepo.save(user)
    }
}
