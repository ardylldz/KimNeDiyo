package tv.codelong.thenewboston.repository

import org.springframework.data.repository.CrudRepository
import tv.codelong.thenewboston.model.User

interface UserRepo : CrudRepository<User, Long> {
    fun findByName(name: String): User?
    fun existsByName(name: String): Boolean
}
