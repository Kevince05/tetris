<?php
session_start();
$error = null;
$db = new mysqli("localhost", "root", "", "3d_sim");

if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST["email"];
    $pwd = md5($_POST["password"]);

    if ($_POST["submit_type"] === "Login") {
        $prep = $db->prepare("SELECT * FROM users WHERE email=? AND password=?");
        $prep->bind_param("ss", $email, $pwd);
        $prep->execute();
        $result = $prep->get_result();
        if ($result->num_rows == 1) {
            $_SESSION["email"] = $email;
            $_SESSION["password"] = $pwd;
            $_SESSION["admin"] = $result->fetch_assoc()["admin"] === 1 ? true : false;
            header("Location:index.php");
        } else {
            $error = "Wrong user or password";
        }
    } else {
        $name = $_POST["name"];
        $surname = $_POST["surname"];
        $prep = $db->prepare("INSERT INTO users (email, password, name, surname, last_login) VALUE (?,?,?,?, CURDATE())");
        $prep->bind_param("ssss", $email, $pwd, $name, $surname);
        if ($prep->execute()) {
            header("Location:index.php");
        } else {
            $error = "Error:" . $db->error;
        }
    }
}
?>

<!DOCTYPE html>
<html>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">


<head>
    <title>Login</title>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://cdn.babylonjs.com/cannon.js"></script>
</head>

<body data-bs-theme="dark" style="overflow: hidden;">
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col" <?php $col = ['#0dcaf0', '#20c997', '#198754', '#fd7e14', '#6f42c1', '#6610f2', '#0d6efd'];
                                    echo 'style = "background-color:' . $col[array_rand($col, 1)] . '50;"' ?> id="loginCol">
                    <div class="d-flex position-relative top-50 start-50 translate-middle">
                        <form method="post" class="w-100">
                            <h3 class="fw-normal mb-3 pb-3">Log in</h3>
                            <div id="name-wrapper" class="mb-3" style="display: none">
                                <label class="form-label" for="name">Name</label>
                                <input name="name" type="text" id="name" class="form-control form-control" />
                            </div>
                            <div id="surname-wrapper" class="mb-3" style="display: none">
                                <label class="form-label" for="surname">Surname</label>
                                <input name="surname" type="surname" id="surname" class="form-control form-control" />
                            </div>
                            <div id="email-wrapper" class="mb-3">
                                <label class="form-label" for="email">Email address</label>
                                <input name="email" type="email" id="email" class="form-control form-control" required />
                            </div>
                            <div id="password-wrapper" class="mb-3">
                                <label class="form-label" for="password">Password</label>
                                <input name="password" type="password" id="password" class="form-control form-control" required />
                            </div>
                            <div id="submit-wrapper">
                                <input id="login" type="submit" name="submit_type" value="Login" class="btn btn-primary mt-1" />
                                <input id="register" type="button" name="submit_type" value="Register" class="btn btn-primary mt-1" />
                                <script>
                                    let register = document.getElementById("register");
                                    let login = document.getElementById("login");
                                    register.addEventListener("click", function() {
                                        document.getElementById("name-wrapper").style.display = "block";
                                        document.getElementById("name").required = true;
                                        document.getElementById("surname-wrapper").style.display = "block";
                                        document.getElementById("surname").required = true;
                                        register.type = "submit";
                                        login.value = "Cancel";
                                        login.classList.remove("btn-primary");
                                        login.classList.add("btn-danger");
                                    })

                                    login.addEventListener("click", function() {
                                        if (login.value === "Cancel") {
                                            document.getElementById("name-wrapper").style.display = "none";
                                            document.getElementById("name").required = false;
                                            document.getElementById("surname-wrapper").style.display = "none";
                                            document.getElementById("surname").required = false;
                                            register.type = "button";
                                            login.value = "Login";
                                            login.classList.remove("btn-danger");
                                            login.classList.add("btn-primary");
                                        }
                                    })
                                </script>
                            </div>
                            <?php
                            if (isset($error)) {
                                echo '<div id="error-wrapper" class="container"><p>' . $error . '</p></div>';
                            }
                            ?>
                        </form>
                    </div>
                </div>
                <div class="col-sm-9 px-0">
                    <canvas id="demo" touch-action="none" style="touch-action: none; outline: none; -webkit-tap-highlight-color: transparent; height: 100vh; width: 100%;"></canvas>
                    <script src="script/tetris.js"></script>
                    <script src="script/demo.js"></script>
                </div>
            </div>
        </div>
    </section>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</html>