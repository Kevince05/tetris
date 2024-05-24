<?php
session_start();

// Logout functionality
if (isset($_POST['requestType'])) {
    session_destroy();
    header("Location: login.php");
    exit;
}

// Check if user is not logged in
if (!isset($_SESSION['email'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>"3D" Tetris Online</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body data-bs-theme="dark">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active">Play</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="leaderboard.php">Leaderboards</a>
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
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="d-flex position-relative top-50 start-50 translate-middle">
                        <div class="container">
                            <div class="row">
                                <h2>"3D" Tetris</h2>
                                <p>- Move the piece using the arrow keys <br>
                                    - Rotate with up key (Work in progress)</p>
                            </div>
                            <div class="row">
                                <button id="startBtn" class="col btn btn-primary mx-1">Start</button>
                                <button id="stopBtn" class="col btn btn-danger mx-1 " style="display: none">Stop</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-9 px-0">
                    <canvas id="renderCanvas" touch-action="none" style="touch-action: none; outline: none; -webkit-tap-highlight-color: transparent; height: 93.6vh; width: 100%;"></canvas>
                    <script src="./game/js/bundle.js"></script>
                </div>
            </div>
        </div>
    </section>
</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</html>