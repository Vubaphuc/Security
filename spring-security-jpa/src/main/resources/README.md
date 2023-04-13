
## 1. Trình bày khái niệm liên quan đến các đối tượng sau:

 - UserNamePasswordAuthenticationToken : Đây là một lớp trong Spring Security được sử dụng để đại diện cho thông tin xác thực của người dùng, bao gồm tên đăng nhập và mật khẩu. Nó cũng có thể chứa các thông tin xác thực bổ sung như mã OTP (One-Time Password) hoặc mã thông báo.
 - AuthenticationManager : Đây là một interface trong Spring Security được sử dụng để quản lý quá trình xác thực của người dùng. Nó có nhiệm vụ chấp nhận một đối tượng Authentication (ví dụ như UserNamePasswordAuthenticationToken) và trả về một đối tượng Authentication đã được xác thực thành công.
 - AuthenticationProvider : Đây là một interface trong Spring Security được sử dụng để thực hiện quá trình xác thực của người dùng. Nó chứa các phương thức để xác thực thông tin người dùng (ví dụ như tên đăng nhập và mật khẩu) và trả về một đối tượng Authentication nếu xác thực thành công.
 - PasswordEncoder : Đây là một interface trong Spring Security được sử dụng để mã hóa mật khẩu của người dùng. Nó đảm bảo rằng mật khẩu được lưu trữ trong cơ sở dữ liệu một cách an toàn và không thể đọc được.
 - UserDetailsService : Đây là một interface trong Spring Security được sử dụng để lấy thông tin người dùng từ cơ sở dữ liệu. Nó chứa phương thức để lấy thông tin người dùng (ví dụ như tên đăng nhập, mật khẩu và vai trò) từ cơ sở dữ liệu và trả về một đối tượng UserDetails.
 - UserDetails :  Đây là một interface trong Spring Security được sử dụng để đại diện cho thông tin của một người dùng trong hệ thống. Nó chứa các thông tin như tên đăng nhập, mật khẩu đã mã hóa và danh sách các vai trò của người dùng trong hệ thống.

## 2. Dựa vào hiểu biết của em. Hãy trình bày sơ lược về workflow trong Spring Security

workflow trong Spring Security là các bước xác thực và phân quyền tự động trong Spring Security nhằm đảm bảo những người có quyền mới có thể truy cập vào các ứng dụng mà họ được phân quyền.


## 3. Session là gì? Cookie là gì? Nêu sự khác biệt giữa session và cookie

Session và Cookie là 1 cơ chế để lưu trữ thông tin tạm thời giữa các yêu cầu từ người dùng. Khi người dùng truy cập vào 1 ứng dụng spring boot thì session hoặc cookie sẽ được tạo ra để lưu giữ thông tin về người dùng đó.
Sự khác nhau giữa Session và Cookie là :

- Vị trí lưu trữ: Session được lưu trữ trên máy chủ, trong khi Cookie được lưu trữ trên máy tính của người dùng.
- Thời gian lưu trữ: Session được lưu trữ trong suốt phiên làm việc của người dùng, trong khi Cookie có thể được cấu hình để lưu trữ trong khoảng thời gian nhất định hoặc đến khi người dùng xóa nó.
- Khả năng lưu trữ: Session có thể lưu trữ nhiều loại dữ liệu, bao gồm cả đối tượng Java, trong khi Cookie chỉ có thể lưu trữ các giá trị chuỗi đơn giản.
- An ninh: Session an toàn hơn Cookie vì nó được lưu trữ trên máy chủ và không thể bị sửa đổi hoặc truy cập trái phép bởi người dùng. Cookie có thể dễ dàng bị thay đổi bởi người dùng hoặc bị lộ thông tin nếu không được mã hóa đúng cách.
