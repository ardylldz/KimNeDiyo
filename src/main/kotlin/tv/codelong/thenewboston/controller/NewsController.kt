package tv.codelong.thenewboston.controller

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import tv.codelong.thenewboston.dto.*
import tv.codelong.thenewboston.model.News
import tv.codelong.thenewboston.service.NewsService
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.file.Files
import java.util.*

@RestController
@RequestMapping("/api/news")
class NewsController(
    private val newsService: NewsService
) {

    @GetMapping
    fun getNews(authentication: Authentication): List<NewsDto> {
        return newsService.findAll().map { item ->
            NewsDto(
            id = item.id,
            content = item.content,
            header = item.header,
            image = if(item.imgPath .isNullOrBlank()){
                ""
            } else {
                convertImageToBase64(item.imgPath)
            }
        )}
    }

    @PostMapping
    fun createNews(authentication: Authentication,
                   @ModelAttribute news: CreateNewsDto
                   ) {
        var filePath = ""
           if(news.img != null) {
              filePath = saveFile(news.img, "C:\\Users\\arday\\dev\\kim-ne-diyo\\images")
          }
        val news = News(
            header = news.header,
            content = news.content,
            imgPath = filePath
        )

        newsService.save(news)
    }
    fun saveFile(multipartFile: MultipartFile, targetDirectory: String): String {
        try {
            return saveToFilesystem(multipartFile, targetDirectory)
        } catch (e: Exception) {
            throw RuntimeException("Unable to save file", e)
        }
    }

    private fun convertImageToBase64(filePath: String?): String? {
        if (filePath == null) return null

        try {
            val file = File(filePath)
            if (!file.exists()) return null

            val imageBytes = Files.readAllBytes(file.toPath())
            return Base64.getEncoder().encodeToString(imageBytes)
        } catch (e: IOException) {
            e.printStackTrace()
            return null
        }
    }

    @Throws(IOException::class)
    fun saveToFilesystem(multipartFile: MultipartFile, targetDirectory: String): String {
        val filePath = targetDirectory + File.separator + multipartFile.originalFilename
        val file = File(filePath)

        FileOutputStream(file).use { os ->
            os.write(multipartFile.bytes)
        }
        return filePath
    }

    /*@PutMapping("/{id}")
    fun updateNews(@PathVariable id: Long, @RequestBody payload: UpdateNewsDto) {
        val news = newsService.getNewsById(id) ?: throw ApiException(404, "News not found")

        news.header = payload.header
        news.content = payload.content

        newsService.saveNews(news)
    }

    @DeleteMapping("/{id}")
    fun deleteNews(@PathVariable id: Long) {
        val news = newsService.getNewsById(id) ?: throw ApiException(404, "News not found")
        newsService.deleteNews(news)
    }*/
    @DeleteMapping("/{id}")
    fun deleteNews(@PathVariable id: Long) {
        newsService.deleteNewsById(id)
    }

}

