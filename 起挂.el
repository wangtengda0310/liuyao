(defun 更新 (l key val)
  (setq l (cons (cons key val)
                (delq (assoc key l) l))))
(defvar 六个爻 '("初爻" "二爻" "三爻" "四爻" "五爻" "上爻"))

(defvar 老阳)
(defvar 老阴)
(defvar 少阳)
(defvar 少阴)

(defvar f '((1 . 少阳) (2 . 少阴)(3 . 老阳) (0 . 老阴)))

(defun 起挂 ()
  (interactive)
  (if 挂
      (setq 挂 nil)
      (defvar-local 挂 nil))
  (dolist (n 六个爻)
    (setq 挂 (cons (cons n (cdr (assoc (random 4) f)))
		   挂)))
  (with-current-buffer "新挂"
    (dolist (爻 挂)
      (insert (concat (symbol-name (cdr 爻)) "\n")))
    (message 挂)))
