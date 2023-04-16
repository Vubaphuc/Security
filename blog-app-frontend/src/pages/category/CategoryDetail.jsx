import React from "react";
import { Link } from "react-router-dom"

function CategoryDetail() {
  return (
    <main className="main">
      <header className="entry-header">
        <h1 style={{ marginBottom: "1rem" }}>Tag : Java</h1>
      </header>

      <article className="post-entry">
        <header className="entry-header">
          <h2>
            Hướng dẫn tạo tài khoản và sử dụng Chat GPT chỉ với 1 cốc trà đá
          </h2>
        </header>
        <div className="entry-content">
          <p>
            Dạo này Chat GPT đang rất hot, được thần thành hóa lên quá khiến
            nhiều người lo sợ nó sẽ “cướp” mất công việc của mình. Vậy Chat GPT
            cụ thể là gì, dùng như nào? Bài viết này mình sẽ hướng dẫn các bạn
            tự tạo tài khoản cho riêng mình và trải nghiệm thử Chat GPT, một
            công cụ khá hữu ích nếu bạn sử dụng đúng cách. Còn nếu muốn trải
            nghiệm nhanh thì các bạn có thể kéo xuống cuối bài viết để lấy một
            số tài khoản free được chia sẻ trên mạng (dùng chung cho nhiều
            người)....
          </p>
        </div>
        <footer className="entry-footer">
          <span>01/02/2023</span>
        </footer>
        <Link
          className="entry-link"
          aria-label="post link to Hướng dẫn tạo tài khoản và sử dụng ChatGPT chỉ với 1 cốc trà đá"
          to={"/blogs/1/abc"}
        ></Link>
      </article>
    </main>
  );
}

export default CategoryDetail;
