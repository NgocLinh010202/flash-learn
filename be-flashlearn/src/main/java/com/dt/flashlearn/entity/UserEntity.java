package com.dt.flashlearn.entity;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = {
            "email"
    })
})
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @NotBlank
    @Size(max = 50)
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank
    @Pattern(regexp = "(?=.*[0-9]).+", message = "Mật khẩu phải có ít nhất 1 chứ số")
    @Pattern(regexp = "(?=.*[a-z]).+", message = "Mật khẩu phải có ít nhất 1 chữ thường")
    @Pattern(regexp = "(?=.*[A-Z]).+", message = "Mật khẩu phải có ít nhất 1 chữ hoa")
    @Pattern(regexp = "(?=.*[@#$%^&+=]).+", message = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt")
    @Size(min = 6, max = 255, message = "Mật khẩu có ít nhất 6 kí tự và nhiều nhất 50 kí tự")
    private String password;

    @NotBlank
    @Size(min = 3, max = 30)
    private String name;

    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Số điện thoại không đúng định dạng")
    private String phone;

    private String role;

    @NotNull
    private Boolean deleted;
    
}
