(defun 更新 (l key val)
  (setq l (cons (cons key val)
                (delq (assoc key l) l))))
(defvar 六个爻 '("初爻" "二爻" "三爻" "四爻" "五爻" "上爻"))

(defvar 老阳 "老阳 ———  ->  —  —")
(defvar 老阴 "老阴 —  —  ->  ———")
(defvar 少阳 "少阳 ———      ———")
(defvar 少阴 "少阴 —  —      —  —")

(defvar 八纯挂
  '(
    ("乾" . (make-list 6 少阳))
    ("坤" . (make-list 6 少阴))
    ("艮" . '(阴爻 阴爻 阳爻 阴爻 阴爻 阳爻))
    ("兑" . '(阳爻 阳爻 阴爻 阳爻 阳爻 阴爻))
    ("坎" . '(阴爻 阳爻 阴爻 阴爻 阳爻 阴爻))
    ("离" . '(阳爻 阴爻 阳爻 阳爻 阴爻 阳爻))
    ("震" . '(阳爻 阴爻 阴爻 阳爻 阴爻 阴爻))
    ("巽" . '(阴爻 阳爻 阳爻 阴爻 阳爻 阳爻))
    ))

(defvar 八卦对应五行
  '(
    ("乾" . "金")
    ("兑" . "金")
    ("离" . "火")
    ("震" . "木")
    ("巽" . "木")
    ("坎" . "水")
    ("艮" . "土")
    ("坤" . "土")
    ))
(defvar 五行相生
  '(
    ("水" . "木")
    ("木" . "火")
    ("火" . "土")
    ("土" . "金")
    ("金" . "水")
    ))

(defvar 五行相克
  '(
    ("水" . "火")
    ("木" . "土")
    ("火" . "金")
    ("土" . "水")
    ("金" . "木")
    ))

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
