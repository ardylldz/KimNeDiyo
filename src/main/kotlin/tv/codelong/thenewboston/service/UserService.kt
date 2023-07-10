package tv.codelong.thenewboston.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import tv.codelong.thenewboston.model.User
import tv.codelong.thenewboston.repository.UserRepo

@Service
class UserService(
        private val userRepo: UserRepo,
) {
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
}
