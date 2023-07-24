package tv.codelong.thenewboston.model

import jakarta.persistence.*

@Entity
    data class News(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "news_id_seq")
    @SequenceGenerator(name = "news_id_seq", allocationSize = 1)
    val id: Long = 0,

    @Column
    var header: String = "",

    @Column
    var content: String? = null,

    @Column
    val imgPath: String? = null,
    )
