(defun 更新 (l key val)
  (setq l (cons (cons key val)
                (delq (assoc key l) l))))
(defvar 六个爻 '("初爻" "二爻" "三爻" "四爻" "五爻" "上爻"))

(defvar 老阳 "老阳 ———  ->  —  —")
(defvar 老阴 "老阴 —  —  ->  ———")
(defvar 少阳 "少阳 ———      ———")
(defvar 少阴 "少阴 —  —      —  —")

(defvar 四相 '((1 . 少阳) (2 . 少阴)(3 . 老阳) (0 . 老阴)))

(defvar 挂)

(defun 装挂 ()
  (setq 挂 nil)
  (dolist (n 六个爻)
    (setq 挂 (cons (cons n (cdr (assoc (random 4) 四相)))
		   挂))))

(defun 新buffer显示挂 ()
  (with-current-buffer
      (switch-to-buffer "新挂")
    (dolist (每爻 挂)
      (insert (concat (symbol-value (cdr 每爻)))
	      "\n"))))

(defun 起挂 ()
  (interactive)

  (装挂)

  (新buffer显示挂))
