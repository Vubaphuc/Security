package com.example.blogappbackend.service;

import com.example.blogappbackend.entity.Image;
import com.example.blogappbackend.entity.User;
import com.example.blogappbackend.exception.BadRequestException;
import com.example.blogappbackend.exception.NotFoundException;
import com.example.blogappbackend.repository.ImageRepository;
import com.example.blogappbackend.response.FileResponse;
import com.example.blogappbackend.security.ICurrentUserImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileService {
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ICurrentUserImpl iCurrentUser;

    public FileResponse uploadFile(MultipartFile file) {

        try {
            User user = iCurrentUser.getUser();

        Image image = Image.builder()
                .type(file.getContentType())
                .data(file.getBytes())
                .build();
        imageRepository.save(image);

        FileResponse fileResponse = new FileResponse("http://localhost:8080/api/v1/admin/files/" +  image.getId());

        return fileResponse;
    } catch (IOException e) {
        throw new RuntimeException("Có lỗi xảy ra");
    }
}


    private void validataFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        // tên file không được để trống
        if (fileName == null || fileName.isEmpty()) {
            throw new BadRequestException("Tên File Không hợp lệ");
        }

        // type (loại) file có nằm trong danh sánh cho phép hay không
        // avatar.png, image.jpg => lấy ra đuôi file png và jpg
        String fileExtension = getFileExtension(fileName);
        if (!checkFileExtension(fileExtension)) {
            throw new BadRequestException("Type File Không hợp lệ");
        }

        // kích thước size có trong phạm  vi cho phép không
        double fileSize = (double) file.getSize() / 1048576;
        if (fileSize > 2) {
            throw new BadRequestException("Size File không được vượt quá 2MB");
        }
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf(".");
        if (lastIndex == -1) {
            return "";
        }
        return fileName.substring(lastIndex + 1);
    }

    private boolean checkFileExtension (String fileExtension) {
        List<String> fileExtensions = List.of("png","jpeg","jpg");
        return fileExtensions.contains(fileExtension);

    }

    public Image readFile(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Image with id = " + id);
        });
        return image;
    }

    public List<Image> findListImageByUserLogin(Integer id) {

        if (!iCurrentUser.getUser().equals(id)) {
            throw new BadRequestException("User Id = " + id + " không phải là user đang login");
        }

        return imageRepository.findAllByUser_Id(id);
    }

    public Image deleteImageByUserLogin(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not Found Image with id = " + id);
        });

        if (!image.getUser().getId().equals(iCurrentUser.getUser().getId())) {
            throw new BadRequestException("Image không phải của user login");
        }

        imageRepository.deleteById(image.getId());

        return image;
    }
}
