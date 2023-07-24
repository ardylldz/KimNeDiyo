package tv.codelong.thenewboston.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api")
class imageController {
    @PostMapping("/upload")
    fun uploadImage(@RequestParam("file") file: MultipartFile): ResponseEntity<String> {
        // Process the file here (e.g., save it to the server or a database)
        // For simplicity, we'll just return the filename for this example.
        val fileName = file.originalFilename
        println("Received file: $fileName")
        return ResponseEntity.ok("File uploaded successfully: $fileName")
    }



}