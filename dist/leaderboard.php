<?php
session_start();
$error = null;
$db = new mysqli("localhost", "root", "", "tetris");

if ($db->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if user is not logged in
if (!isset($_SESSION['email'])) {
    header("Location: login.php");
    exit;
}

//request handle
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    switch ($_POST['requestType']) {
        case "Logout":
            session_destroy();
            header("Location: login.php");
            exit;
    }
}

?>
<!DOCTYPE html>
<html>

<head>
    <title>Disponibilità</title>
    <link rel="stylesheet" type="text/css" href="style/reservation_style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body <?php
        $bga = ["login_backgrounds/background.png", "login_backgrounds/background1.png", "login_backgrounds/background2.png", "login_backgrounds/background3.png"];
        echo 'style="background-image: url(' . $bga[array_rand($bga, 1)] . '); backgound-repeat:no-repeat; background-size:cover;" data-bs-theme="dark"';
        ?>>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Play</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active">Leaderboards</a>
                    </li>
                    <?php
                    if ($_SESSION['admin']) {
                        echo '<li class="nav-item">
                                <a class="nav-link" href="admin.php">Admin</a>
                              </li>';
                    }
                    ?>
                </ul>
                <form method="post" action="index.php"" class=" d-flex">
                    <input type="submit" class="btn btn-danger" name="requestType" value="Logout">
                </form>
            </div>
        </div>
    </nav>
    </divc>
    <div class="container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">PFP</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $result = $db->query("SELECT * FROM users ORDER BY Score DESC");
                while ($row = $result->fetch_assoc()) {
                    echo '<tr>
                            <td>' . $row["name"] . '</td>
                            <td>' . $row["surname"] . '</td>
                            <td><img src="' . $row["pfp_path"] . ' alt="PFP Not found"></td>
                            <td>' . $row["score"] . '</td>
                          </tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
    <?php
    if (isset($error)) {
        echo '<div class="error-container"><p>' . $error . '</p></div>';
    }
    ?>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</html>