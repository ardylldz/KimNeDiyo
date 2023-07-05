package tv.codelong.thenewboston

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/users")
@CrossOrigin
class HelloWorldController {
    @GetMapping("/hello")
    fun helloWorld() : String = "hello this is a rest endpoint"
}
