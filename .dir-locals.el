;;; Directory Local Variables            -*- no-byte-compile: t -*-
;;; For more information see (info "(emacs) Directory Variables")

((nil . ((mode . editorconfig)))
 (python-base-mode
  . ((flycheck-python-mypy-python-executable . "./.venv/bin/mypy")))
 (typescript-ts-base-mode
  .
  ((eval .
         (let (project-directory
               (dir-locals-find-file default-directory))
           (setq lsp-clients-typescript-server-args
                 `("--tsserver-path" ,(concat
                     project-directory ".yarn/sdks/typescript/bin/tsserver")
                   "--stdio")))))))
